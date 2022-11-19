male_terms_job = ["active", "adventurous", "aggressive", "ambitious", "analytic", "assertive", "athletic", "autonomous", "battle", "boastful", "challenge", "champion", "competitive", "confident", "courageous", "decide", "decision", "decisive", "defend", "determined", "dominating", "dominant", "driven", "fearless", "fight", "forceful", "greedy", "head-strong", "headstrong", "hierarchical", "hostile", "impulsive", "independent", "individual", "intellectual", "lead", "logical", "objective", "opinionated", "outspoken", "persistent", "principle", "reckless", "self-confident", "self-reliant", "self-sufficient", "stubborn", "superior", "unreasonable"];
female_terms_job = ["agreeable", "affectionate", "child", "cheering", "collaborative", "communal", "compassionate", "connecting", "considerate", "cooperative", "co-operative", "dependable", "emotional", "empathetic", "feeling", "flatterable", "gentle", "honest", "interdependent", "interpersonal", "kind", "kinship", "loyal", "modest", "nagging", "nurturing", "pleasant", "polite", "quiet", "responsive", "sensitive", "submissive", "supportive", "sympathetic", "tender", "trusting", "understanding", "warm", "whiney", "enthusiastic", "inclusive", "yielding", "share", "sharing"];

function submittext(){
    inputtext = '';
    outputtext = '';

    inputtext = document.getElementById("input_field").value;

    if(inputtext.substring(0,4) == 'http'){
        URLText = getURLText(inputtext);
        console.log(URLText);
    }

    outputtext = bias_detector(inputtext,male_terms_job);
    document.getElementById('final_output').innerHTML = outputtext;
    counts = listToString(count_terms(inputtext,male_terms_job));
    document.getElementById('count_output').innerHTML = counts;
}

function listToString(list){
    text = '';
    for (let i = 0; i < list.length; i++) {
        text += list[i] + " ";
    }
    return text;
}

function bias_detector(in_text, terms){
    in_arr = in_text.split(" ");

    let output = '';
    let final = [];

    let count = 0;
    let term_indicies = [];
    in_arr.forEach(element => {
        if(terms.includes(element)){
            term_indicies.push(count);
        }
        count += 1;
    });

    let count2 = 0;
    in_arr.forEach(element2 => {
        if(term_indicies.includes(count2)){
            output = "<b id=biased>" + element2 + "</b>";
            final.push(output);
        } else{
            final.push(element2);
        }
        count2 += 1;
    });

    final_string = listToString(final);
    return final_string;
}

function count_terms(in_text,terms){
    
    in_arr = in_text.split(" ");
    term_counts = [];
    terms.forEach(element => {
        temp_count = 0;
        for (let i = 0; i < in_arr.length; i++) {
            if (in_arr[i] == element){
                temp_count += 1;
            };
        };
        if(temp_count != 0) {
            counts = "<b id=biased>" + element + ": " + temp_count + "</b>" + ", ";
        } else {
            counts = element + ": " + temp_count + ", ";
        }
        term_counts.push(counts);
    });

    return term_counts;
}

function getURLText(inputurl){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', inputurl, true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }
}