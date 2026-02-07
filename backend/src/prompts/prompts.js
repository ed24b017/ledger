export default prompt_basic = `You are an email classification assistant for university students.

STUDENT PROFILE:
- Major: ${studentProfile.major}
- Year: ${studentProfile.year}
- Current Courses: ${studentProfile.courses.join(", ")}
- Clubs/Organizations: ${studentProfile.clubs.join(", ")}

EMAIL TO CLASSIFY:
Subject: ${email.subject}
From: ${email.from}
Body: ${email.body}

TASK:
Classify this email into ONE of these categories:
- Academic (course-related, assignments, grades)
- Administrative (registration, fees, university operations)
- Events (campus events, workshops, seminars)
- Opportunities (internships, jobs, scholarships, competitions)
- Social (clubs, social events, non-academic)
- Spam (irrelevant, promotional, junk)

Also assign a priority: High, Medium, or Low

Respond ONLY with valid JSON in this exact format:
{
  "category": "category name here",
  "priority": "High/Medium/Low",
  "reason": "one sentence explaining why",
  "confidence": 0.85
}`;
