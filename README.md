SERVICE GOALS:

* MAIN ENDPOINT:
    * VALIDATE INPUT
    * CHECK EXISTING DATA
    * JOB DISPATCH
* WORKER ENDPOINT:
    * LONG RUNNING
    * UPLOADS DATA TO S3
    * NO HTTP, INVOKE ONLY

ENDPOINTS:
1. /index?name=facebook/react
2. [NOPE] /download?job=5895ed93-d1f0-45eb-b525-101339fcf158

MODELS:
* JOB MODEL: CONTAINS TARGET REPO NAME/BRANCH/URL
* REPO METADATA: REPO NAME, DATA URL, LAST MODIFIED

