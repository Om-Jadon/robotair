from flask import Flask, request, jsonify 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

total_logs = []

@app.route('/upload', methods=['POST'])
def upload_log():
    global total_logs 
    file = request.files['file']
    content = file.read().decode('utf-8')
    total_logs = parse_logs(content)
    return jsonify({"message":"File uploaded and logs parsed successfully!"})

@app.route('/logs', methods=['GET'])
def get_logs():
    filtered_logs = total_logs
    severities = request.args.get('severity')
    search = request.args.get('search')

    if not severities:
        return jsonify([])

    if search:
        filtered_logs = [
            log for log in filtered_logs 
            if search.lower() in log['message'].lower() or search.lower() in log['node'].lower()
        ]

    if severities:
        severity_list = severities.split(',')
        filtered_logs = [
            log for log in filtered_logs 
            if log['severity'] in severity_list
        ]

    return jsonify(filtered_logs)


def parse_logs(content):
    lines = content.split('\n')
    parsed_logs = []
    for line in lines:
        if line:
            formatted_line = []
            for word in line.split(']'):
                if word:
                    formatted_line.append(word.lstrip(' [').rstrip('.'))
            parsed_logs.append({
                "timestamp": formatted_line[0],
                "severity": formatted_line[1],
                "node": formatted_line[2],
                "message": formatted_line[3]
            })

    return parsed_logs

if __name__ == '__main__':
    app.run(port=5001)