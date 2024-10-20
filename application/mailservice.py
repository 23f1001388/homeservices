# from flask import Flask,request,jsonify
# from app import app,mail
# from flask_mail import Message,Mail




# def send_email(to, subject, content_body):
#     data = request.get_json()
#     if not data or not all(k in data for k in ('subject', 'recipient', 'body')):
#         return jsonify({'error': 'Invalid data'}), 400

#     subject = data['subject']
#     recipient = data['recipient']
#     body = data['body']

#     msg = Message(subject, recipients=[recipient])
#     msg.body = body

#     try:
#         with app.app_context():
#             mail.send(msg)
#         return jsonify({'message': 'Email sent successfully!'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500