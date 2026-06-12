# 🛡️ Project 1 — The Static Fortress
### DecodeLabs Cloud Computing Internship | Batch 2026

![AWS S3](https://img.shields.io/badge/AWS-S3-orange?logo=amazon-aws)
![CloudFront](https://img.shields.io/badge/AWS-CloudFront-orange?logo=amazon-aws)
![HTML](https://img.shields.io/badge/HTML5-Static_Website-red?logo=html5)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?logo=javascript)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📋 Scenario
A startup needs to launch a public-facing website without managing any servers.
The mission: host a fully functional static website on AWS S3, then supercharge
it with a CloudFront CDN for global delivery, HTTPS, and edge caching — with
zero server management.

---

## 🎯 Mission Accomplished
- ✅ Created and configured an AWS S3 bucket for static website hosting
- ✅ Uploaded HTML, CSS, and JavaScript source files
- ✅ Configured bucket policy for public read access
- ✅ Enabled static website hosting with index.html as the entry point
- ✅ Created a CloudFront distribution pointing to the S3 origin
- ✅ Accessed the live website via the CloudFront HTTPS endpoint

---

## 🏗️ Architecture

```
User Browser
     │
     │  HTTPS Request
     ▼
┌─────────────────────────────────────────────┐
│         AWS CloudFront (CDN)                        │
│         xxxx.cloudfront.net                         │
│         Global Edge Locations                       │
│         SSL/TLS Encryption (HTTPS)                  │
│         Caching at the Edge                         │
└─────────────────┬───────────────────────────┘
                  │  Origin Request (on cache miss)
                  ▼
┌─────────────────────────────────────────────┐
│         AWS S3 Bucket                               │
│         Static Website Hosting                      │
│                                                     │
│   ├── index.html   (Entry Point)                   │
│   ├── style.css    (Styling)                       │
│   └── script.js    (Logic)                         │
└─────────────────────────────────────────────┘
```

**Key AWS Services:**
- **Amazon S3** — Object storage and static file hosting
- **Amazon CloudFront** — Global CDN with HTTPS and edge caching

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
    ├── 05-cloudfront-distribution.png
    ├── 06-cloudfront-deployed.png
    └── 07-live-website-cloudfront.png
```

---

## ⚙️ S3 Bucket Policy

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

## 🔧 S3 Configuration

| Setting | Value |
|---|---|
| Region | us-east-1 (N. Virginia) |
| Hosting Type | Static Website Hosting |
| Index Document | index.html |
| Block Public Access | Disabled (public website) |
| Bucket Versioning | Disabled |

---

## ☁️ CloudFront Configuration

| Setting | Value |
|---|---|
| Origin | S3 Bucket Website Endpoint |
| Protocol | HTTPS (SSL/TLS) |
| Cache Behavior | Default (CachingOptimized) |
| Price Class | All Edge Locations |
| Status | Enabled / Deployed |

---

## 🆚 S3 vs CloudFront — Why Both?

| Feature | S3 Direct | S3 + CloudFront |
|---|---|---|
| Protocol | HTTP only | **HTTPS** ✅ |
| Speed | Single region | **Global edge caching** ✅ |
| Security | Basic | **SSL/TLS encryption** ✅ |
| Performance | Standard | **Millisecond delivery** ✅ |

---

## 📸 Screenshots
> See the `/screenshots` folder for step-by-step visual proof of the complete setup.

---

## 🛠️ Technologies Used
- **Amazon S3** — Static file storage and website hosting
- **Amazon CloudFront** — Global CDN, HTTPS, edge caching
- **HTML5** — Website structure
- **CSS3** — Styling and layout
- **JavaScript** — Client-side logic
- **AWS Bucket Policy** — Public access configuration

---

## 👤 Author
**Muhammad Hassan Raza**
Cloud Computing Intern @ DecodeLabs | Batch 2026
