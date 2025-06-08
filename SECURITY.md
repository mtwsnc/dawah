# Security Policy

## Project Information

The Dawah website (https://dawah.mtws.org) is an Islamic educational platform maintained by Markaz Tawheed Was-Sunnah (MTWS). This security policy outlines how we handle security concerns for our website and codebase.

## Supported Versions

This project maintains a rolling release model. Security updates are applied to:

| Component | Status |
| --------- | ------ |
| Current main branch | ✅ Actively maintained |
| Production website (dawah.mtws.org) | ✅ Actively monitored |
| Previous commits | ❌ Not supported |

## Scope

This security policy covers:
- The website codebase hosted on GitHub
- The live website at https://dawah.mtws.org
- User data handling (if any)
- Third-party dependencies and frameworks

## Reporting a Vulnerability

We take security seriously and appreciate responsible disclosure of any security vulnerabilities.

### How to Report

**For security vulnerabilities, please do NOT create a public GitHub issue.**

Instead, please report security issues through one of these methods:

1. **GitHub Security Advisories** (Preferred):
   - Go to the [Security tab](https://github.com/mtwsnc/dawah/security) of this repository
   - Click "Report a vulnerability"
   - Provide detailed information about the vulnerability

2. **Direct Contact**:
   - Email us at **security@mtws.org** for confidential disclosures.
   - For encrypted communication, use our PGP key:
     ```
     -----BEGIN PGP PUBLIC KEY BLOCK-----
     [Insert PGP public key here]
     -----END PGP PUBLIC KEY BLOCK-----
     ```
   - Include "SECURITY" in the subject line

### What to Include

When reporting a vulnerability, please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes or mitigation strategies
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours of report submission
- **Status Updates**: Every 7 days until resolution
- **Fix Timeline**: Critical issues within 7 days, other issues within 30 days

### What to Expect

**If the vulnerability is accepted:**
- We will work with you to understand and reproduce the issue
- A fix will be developed and tested
- Credit will be given in our acknowledgments (unless you prefer anonymity)
- You will be notified when the fix is deployed

**If the vulnerability is declined:**
- We will provide a clear explanation of why it was not accepted
- We may suggest alternative approaches if applicable

## Security Best Practices

For contributors and users:

### For Contributors
- Keep dependencies updated
- Follow secure coding practices
- Test all user inputs for potential XSS vulnerabilities
- Ensure any external links are safe and appropriate
- Review third-party resources before integration

### For Users
- Keep your browser updated when visiting the website
- Report any suspicious behavior or broken security features
- Use caution when clicking external links

## Third-Party Dependencies

This project uses several third-party libraries:
- Bootstrap v5.3.3
- Bulma v1.0.2
- Various JavaScript libraries

We regularly monitor these dependencies for known vulnerabilities and update them as needed.

## Contact

For non-security related issues, please use the standard [GitHub issues](https://github.com/mtwsnc/dawah/issues) system.

For general inquiries about the project, visit our [organization page](https://github.com/mtwsnc).

---

*This security policy is subject to updates as the project evolves. Last updated: June 2025*
