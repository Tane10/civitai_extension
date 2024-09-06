# civitai_extension

puseso messgae wrapper

interface Message {
uuid string
action string
value string | Record<any>
valid boolean
error? string 'stringified json'
timestamp epoch
PEM_KEy? 
}

// client -> background
enum ClientActions (
SET_API_KEY 
REQUEST_API_KEY // client -> background
SEND_PROMPT // client -> background
CHECK_JOB // client -> backgrou


)

// background -> client
enum BackgroundActions (
SEND_API_KEY // background -> client
GENERATION_RESULTS
QUERY_RESULTS
) 

const MessageHandler <generic func> = () => {}
