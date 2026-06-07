# 🛡️ Project 1 — The Static Fortress
### DecodeLabs Cloud Computing Internship | Batch 2026

![AWS](https://img.shields.io/badge/AWS-S3-orange?logo=amazon-aws)
![HTML](https://img.shields.io/badge/HTML5-Static_Website-red?logo=html5)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?logo=javascript)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📋 Scenario
A startup needs to launch a public-facing website without managing any servers.
The mission: host a fully functional static website on AWS S3 — scalable, durable,
and globally accessible with zero server management.

---

## 🎯 Mission Accomplished
- ✅ Created and configured an AWS S3 bucket for static website hosting
- ✅ Uploaded HTML, CSS, and JavaScript source files
- ✅ Configured bucket policy for public read access
- ✅ Enabled static website hosting with index.html as the entry point
- ✅ Accessed the live website via the S3 public endpoint URL

---

## 🏗️ Architecture

```
User Browser
     │
     ▼
AWS S3 Bucket (Static Website Hosting)
     │
     ├── index.html  (Entry Point)
     ├── style.css   (Styling)
     └── script.js   (Logic)
```

**Key AWS Service:** Amazon S3 (Simple Storage Service)
**Hosting Type:** Static Website Hosting
**Access:** Public via S3 Endpoint URL

---

## 📁 Repository Structure

```
decodelabs-project1-static-fortress/
├── README.md
├── src/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── config/
│   └── bucket-policy.json
└── screenshots/
    ├── 01-s3-bucket-created.png
    ├── 02-files-uploaded.png
    ├── 03-static-hosting-enabled.png
    ├── 04-bucket-policy-applied.png
    └── 05-live-website.png
```

---

## ⚙️ S3 Bucket Policy Used

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

---

## 🔧 Key Configuration Settings

| Setting              | Value                          |
|----------------------|--------------------------------|
| Region               | us-east-1 (N. Virginia)        |
| Hosting Type         | Static Website Hosting         |
| Index Document       | index.html                     |
| Block Public Access  | Disabled (for public website)  |
| Bucket Versioning    | Disabled                       |

---

## 📸 Screenshots
> See the `/screenshots` folder for step-by-step visual proof of the entire setup.

---

## 🛠️ Technologies Used
- **Amazon S3** — Object storage and static hosting
- **HTML5** — Website structure
- **CSS3** — Styling and layout
- **JavaScript** — Client-side logic
- **AWS Console** — Infrastructure provisioning

---

## 👤 Author
**Muhammad Hassan Raza**
Cloud Computing Intern @ DecodeLabs | Batch 2026
