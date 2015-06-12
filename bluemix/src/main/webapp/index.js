// index.js

function submit_service_form() {
	var select = document.getElementById("service_select");
	var service_name = select.options[select.selectedIndex].value;
	var form = document.getElementById("service_form");
	switch (service_name) {
	case "Sentiment":
		form.action = "api/getsentiment";
		break;
	case "SentimentT":
		form.action = "api/targetsentiment";
		break;
	case "Taxonomy":
		form.action = "api/gettaxonomy";
		break;
	case "Concept":
		form.action = "api/getconcept";
		break;
	case "Entity":
		form.action = "api/getentity";
		break;
	case "Keyword":
		form.action = "api/getkeyword";
		break;
	case "Relation":
		form.action = "api/getrelation";
		break;
	case "SentimentT":
		form.action = "api/targetsentiment";
		break;
	default: break
	}
	form.submit();
}

