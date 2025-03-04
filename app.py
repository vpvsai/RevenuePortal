from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

# 🔹 MongoDB Connection
app.config["MONGO_URI"] = "mongodb+srv://vpavansai2004:L9Yw6zQ1D2y6TdHW@revenueportal.ytae7.mongodb.net/RevenueDepartment"
mongo = PyMongo(app)

# ✅ Create User
@app.route('/create-user', methods=['POST'])
def create_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")  
    department = data.get("department")

    # Check if user already exists
    existing_user = mongo.db.StaffCredentials.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User already exists!", "status": "error"}), 400

    new_user = {"email": email, "password": password, "department": department}
    mongo.db.StaffCredentials.insert_one(new_user)
    return jsonify({"message": "User created successfully!", "status": "success"}), 201

# ✅ Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.StaffCredentials.find_one({"email": email})
    if user:
        if user["password"] == password:  
            return jsonify({"message": "Login successful!", "status": "success", "user": {"email": user["email"], "department": user.get("department", "")}}), 200
        else:
            return jsonify({"message": "Invalid password!", "status": "error"}), 401
    return jsonify({"message": "User not found!", "status": "error"}), 404

# ✅ Add Project
@app.route('/add_project', methods=['POST'])
def add_project():
    data = request.json
    print(data)
    required_fields = [
        "email", "sanctionOrderNumber", "projectTitle", "status",
        "sanctionDate", "agency", "department", "projectSummary",
        "sanctionBudget", "duration"
    ]

    # Validate required fields
    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({"status": "error", "message": f"Missing field: {field}"}), 400

    try:
        mongo.db.AllProjects.insert_one(data)
        return jsonify({"status": "success", "message": "Project added successfully!"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ✅ Fetch All Projects
@app.route('/get-projects', methods=['GET'])
def get_projects():
    try:
        projects = list(mongo.db.ProjectTableDetails.find({}, {'_id': 0}))
        return jsonify({"projects": projects, "status": "success"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500

# ✅ Add Staff Project (Link to Staff)
@app.route('/add_staff_project', methods=['POST'])
def add_staff_project():
    data = request.json
    required_fields = ['email', 'project', 'department', 'amount', 'startDate', 'duration']

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    project_data = {key: data[key] for key in required_fields}
    result = mongo.db.DepartmentProjectDetails.insert_one(project_data)
    return jsonify({'message': 'Project added successfully', 'id': str(result.inserted_id)})

# ✅ Fetch Staff Projects
@app.route('/get_staff_projects', methods=['GET'])
def get_staff_projects():
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    projects = list(mongo.db.DepartmentProjectDetails.find({'email': email}, {'_id': 0}))
    return jsonify({'projects': projects})

# ✅ Add Announcement
@app.route('/add-announcement', methods=['POST'])
def add_announcement():
    data = request.json
    if not data.get("message"):
        return jsonify({"status": "error", "message": "Message is required"}), 400

    mongo.db.announcements.insert_one({"message": data["message"]})
    return jsonify({"status": "success", "message": "Announcement added"}), 201

# ✅ Fetch Announcements
@app.route('/get-announcements', methods=['GET'])
def get_announcements():
    announcements = list(mongo.db.announcements.find({}, {"_id": 0}))
    return jsonify({"announcements": announcements})

# ✅ Fetch Document Projects
@app.route('/get-document-projects', methods=['GET'])
def get_document_projects():
    try:
        projects = list(mongo.db.DocumentProjectDetails.find({}, {'_id': 0}))
        return jsonify({"projects": projects, "status": "success"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500

# ✅ Fetch Department Projects
@app.route('/get_department_projects', methods=['GET'])
def get_department_projects():
    try:
        # Get the email from the query parameters
        email = request.args.get('email')
        
        if not email:
            return jsonify({"message": "Email is required", "status": "error"}), 400
        
        # Filter projects by email
        projects = list(mongo.db.DepartmentProjectDetails.find({"email": email}, {'_id': 0}))
        
        if not projects:
            return jsonify({"message": "No projects found for this email", "status": "success"}), 200
        
        return jsonify({"projects": projects, "status": "success"}), 200

    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500


# ✅ Change Password
@app.route('/change_password', methods=['POST'])
def change_password():
    data = request.json
    email = data.get("email")
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    user = mongo.db.StaffCredentials.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found!", "status": "error"}), 404

    if user["password"] != current_password:
        return jsonify({"message": "Current password is incorrect!", "status": "error"}), 401

    mongo.db.StaffCredentials.update_one({"email": email}, {"$set": {"password": new_password}})
    return jsonify({"message": "Password updated successfully!", "status": "success"}), 200

@app.route('/get_all_projects', methods=['GET'])
def get_all_projects():
    try:
        # Fetch all projects from the collection without filtering by email
        projects = list(mongo.db.DepartmentProjectDetails.find({}, {'_id': 0}))  # Exclude the _id field

        # Ensure that each project includes an email field if missing
        for project in projects:
            if 'email' not in project:
                project['email'] = 'No email provided'  # Add a default value if email is missing

        return jsonify({"projects": projects, "status": "success"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500


if __name__ == "__main__":
    app.run(debug=True)
