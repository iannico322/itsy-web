import axios from 'axios';
import CryptoJS from "crypto-js";
let cancelRequest2: () => void;
async function OpenAIImage({image}:any ) {
const source = axios.CancelToken.source();
const decryptText = (encryptedText: string): string => {
const bytes = CryptoJS.AES.decrypt(encryptedText, "itsy");
return bytes.toString(CryptoJS.enc.Utf8);
};

cancelRequest2 = () => {
source.cancel("Operation canceled by the user.");
};


return new Promise<any[]>(async (resolve) => {
const reader = new FileReader();
reader.readAsDataURL(image);
reader.onload = async () => {


if (typeof reader.result === 'string') {
const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
const data = {
model: "gpt-4o-2024-05-13",
messages: [
{
"role": "user",
"content": [
{
"type": "text",
"text": ` Please examine the items depicted in the image provided and generate a response that includes only food-related items. This includes any food items that are labeled or written in text make sure to include the brand if any has.

The response should be in the following format:
[
{"name": "Banana", "quantity": "2pcs"},
{"name": "Peanut", "quantity": "5pcs"}
]


If no food items are detected, the response should be:
[
{"warning": "No food found"}
]

The response should strictly adhere to the specified format and contain no additional text.

avoid this response: json\n[\n  {\"name\": \"Chicken\", \"quantity\": \"2lbs\"}]

make sure it looks like this: [\n  {\"name\": \"Chicken\", \"quantity\": \"2lbs\"}]"
`
},
{
"type": "image_url",
"image_url": {
"url": `data:image/jpeg;base64,${base64String}`
}
}
]
}
],
max_tokens: 300
};

try {
const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
cancelToken: source.token,
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${decryptText(
localStorage.getItem("none2") || ""
)}` // Use environment variable for API key
}
});
if (response.status !== 200) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const apiResponse = response.data;
if (apiResponse.choices && apiResponse.choices.length > 0) {
resolve(JSON.parse(apiResponse.choices[0].message.content));
} else {
console.error('No choices returned from API');
resolve([]);
}
} catch (error) {
resolve([]);
}
} else {
resolve([]);
}
};
reader.onerror = () => {
resolve([]);
};
});
}
export default OpenAIImage
export { cancelRequest2 };