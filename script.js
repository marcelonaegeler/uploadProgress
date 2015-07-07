var upload = document.getElementsByName('upload')[0];
var progressText = document.querySelector('.progressText');
var progressBg = document.querySelector('.progressBg');
var msg = document.querySelector('.msg');

upload.addEventListener('change', uploadHandler, false);

function uploadHandler() {
	progressText.innerHTML = '0%';
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			var response = JSON.parse(request.response);
			console.log(response);
			msg.innerHTML = 'Completo!';
		}
	}

	function getProgress(event) {
		console.log(event.loaded, event.total, event);
		var percent = Math.ceil((event.loaded / event.total) * 100);
		progressText.innerHTML = percent +'%';
		progressBg.style.width = percent +'%';
	}
	
	var data = new FormData();
	for(var file in upload.files) {
		if(!+file && +file != 0)	
			continue;

		data.append('files[]', upload.files[file]);
	}

	request.upload.addEventListener('progress', getProgress, false);

	request.open('POST', 'upload.php');
	request.send(data);
}