import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);


  const translateText = async () => {


  if (inputText === "") {
  alert("Please enter text first");
  return;
  }

  setLoading(true);

  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";

  const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "201ed7002cmsh9b282f8bc636bf4p1cd773jsn1b3f3667cb50",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
    body: new URLSearchParams({
    q: inputText,
    target: language,
    source: "en",
    }),
  };


  try {
    const response = await fetch(url, options);
    const result = await response.json();


    setOutputText(result.data.translations[0].translatedText);
    setLoading(false);


  } catch (error) {
    console.error(error);
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Text Translator 🌍</h1>


        <textarea className="w-full border p-2 rounded mb-3"
        rows="4" placeholder="Enter English Text..."
        onChange={(e) => setInputText(e.target.value)}
        ></textarea>


        <select className="w-full border p-2 rounded mb-3" onChange={(e) => setLanguage(e.target.value)}>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="pa">Punjabi</option>
        </select>


        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={translateText}>{loading ? "Translating..." : "Translate"}</button>

        <div className="mt-4 border p-3 rounded min-h-[60px]">{outputText}</div>
      </div>

    </div>
    );
  }
}


export default App;