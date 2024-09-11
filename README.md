# civitai_extension

puseso messgae wrapper

const MessageHandler <generic func> = () => {}

TODO: |
add prompt save / load function
save text + example images
prompt templates

TODO: |
add libary page to hold save templates etc
this page can interact with civitai promt fields

IMPORTANT => https://github.com/civitai/civitai/wiki/REST-API-Reference
This is where we will get all the info me need for models etc
and we can use the response and create a model to generate the images
NOTE: might be best to get models in background script then store in indexDB as it would be faster to read from rather then making a web request
