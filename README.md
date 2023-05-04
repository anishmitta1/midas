Use the below command to build an image:

`gcloud run deploy --image gcr.io/<project-id>/<service-name>`

Use the below command to deploy:

`gcloud run deploy --image gcr.io/<project-id>/<service-name> --set-env-vars TELEGRAM_BOT_API_KEY="",RECIPIENT_CHAT_ID="",TELEGRAM_API_BASE_URL=""`
