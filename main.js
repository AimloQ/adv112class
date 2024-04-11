prediction1="";
prediction2="";

Webcam.set({width:350,height:300,image_format:'png',png_quality:100});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(
        function(data_uri)
        {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
        });
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/G5tJ_-qBZ/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth=window.speechSynthesis;
    speak1="The First Prediction is"+prediction1;
    speak2="The Second Prediction is"+prediction2;
    var utterThis= new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if (results[0].label=="happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[0].label=="sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if (results[0].label=="angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }




        if (results[1].label=="happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if (results[1].label=="sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if (results[1].label=="angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}