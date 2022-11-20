
male_terms_job = ["active", "adventurous", "aggressive", "ambitious", "analytic", "assertive", "athletic", "autonomous", "battle", "boastful", "challenge", "champion", "competitive", "confident", "courageous", "decide", "decision", "decisive", "defend", "determined", "dominating", "dominant", "driven", "fearless", "fight", "forceful", "greedy", "head-strong", "headstrong", "hierarchical", "hostile", "impulsive", "independent", "individual", "intellectual", "lead", "logical", "objective", "opinionated", "outspoken", "persistent", "principle", "reckless", "self-confident", "self-reliant", "self-sufficient", "stubborn", "superior", "unreasonable"];
female_terms_job = ["agreeable", "affectionate", "child", "cheering", "collaborative", "communal", "compassionate", "connecting", "considerate", "cooperative", "co-operative", "dependable", "emotional", "empathetic", "feeling", "flatterable", "gentle", "honest", "interdependent", "interpersonal", "kind", "kinship", "loyal", "modest", "nagging", "nurturing", "pleasant", "polite", "quiet", "responsive", "sensitive", "submissive", "supportive", "sympathetic", "tender", "trusting", "understanding", "warm", "whiney", "enthusiastic", "inclusive", "yielding", "share", "sharing"];

function submittext(){
    inputtext = '';
    outputtext = '';

    inputtext = document.getElementById("input_field").value;

    if(inputtext.substring(0,4) == 'http'){
        urltext = getURLText(inputtext);
        inputtext = "<b id=nourl>" + urltext + "</b>";
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
    in_arr_wop = in_text.replace(/[^\w\s\']|_/g, "");
    in_arr_wop = in_arr_wop.toLowerCase();
    in_arr_wop = in_arr_wop.split(" ");

    let output = '';
    let final = [];

    let count = 0;
    let term_indicies = [];
    in_arr_wop.forEach(element => {
        if(terms.includes(element)){
            term_indicies.push(count);
        }
        count += 1;
    });

    let count2 = 0;
    in_arr.forEach(element2 => {
        if(term_indicies.includes(count2)){
            theWhy = whyBiased(element2);
            temp_string = "<b title=\"" + theWhy + "\" id=biased>";
            output = temp_string + element2 + "</b>";
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
    
    in_arr_wop = in_text.replace(/[^\w\s\']|_/g, "");
    in_arr_wop = in_arr_wop.toLowerCase();
    in_arr_wop = in_arr_wop.split(" ");

    term_counts = [];
    terms.forEach(element => {
        temp_count = 0;
        for (let i = 0; i < in_arr_wop.length; i++) {
            if (in_arr_wop[i] == element){
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
    // this feature would require CORS handler chrome extension
    // returns website meta data and title information
    /*
    fetch(inputurl)
        .then(response => {
            console.log(response);
            const html = response.data;
            console.log(html);
        })
        .catch(console.error);
    */
   return "URL parsing is not currently enabled. Please copy the raw website text into the text box above.";
}

function whyBiased(word){
    why_string = whys_dict[word];
    return why_string;
}

var whys_dict = {
    "active": "this is biased because active...",
    "adventurous": "this is biased because adventurous...",
    "aggressive": "this is biased because aggressive...",
    "ambitious": "this is biased because ambitious...",
    "analytic": "this is biased because analytic...",
    "assertive": "this is biased because assertive...",
    "athletic": "this is biased because athletic...",
    "autonomous": "this is biased because autonomous...",
    "battle": "this is biased because battle...",
    "boastful": "this is biased because boastful...",
    "challenge": "this is biased because challenge...",
    "champion": "this is biased because champion...",
    "competitive": "this is biased because competitive...",
    "confident": "this is biased because confident...",
    "courageous": "this is biased because courageous...",
    "decide": "this is biased because decide...",
    "decision": "this is biased because decision...",
    "decisive": "this is biased because decisive...",
    "defend": "this is biased because defend...",
    "determined": "this is biased because determinded...",
    "dominating": "this is biased because dominating...",
    "dominant": "this is biased because dominant...",
    "driven": "this is biased because driven...",
    "fearless": "this is biased because fearless...",
    "fight": "this is biased because fight...",
    "forceful": "this is biased because forceful...",
    "greedy": "this is biased because greedy...",
    "head-strong": "this is biased because head-strong...",
    "headstrong": "this is biased because headstrong...",
    "hierarchical": "this is biased because hierarchical...",
    "hostile": "this is biased because hostile...",
    "impulsive": "this is biased because impulsive...",
    "independent": "this is biased because independent...",
    "individual": "this is biased because individual...",
    "intellectual": "this is biased because intellectual...",
    "lead": "this is biased because lead...",
    "logical": "this is biased because logical...",
    "objective": "this is biased because objective...",
    "opinionated": "this is biased because opinionated...",
    "outspoken": "this is biased because outspoken...",
    "persistent": "this is biased because persistent...",
    "principle": "this is biased because principle...",
    "reckless": "this is biased because reckless...",
    "self-confident": "this is biased because self-confident...",
    "self-reliant": "this is biased because self-reliant...",
    "self-sufficient": "this is biased because self-sufficient...",
    "stubborn": "this is biased because stubborn...",
    "superior": "this is biased because superior...",
    "unreasonable": "this is biased because unreasonable...",

    "agreeable": "this is biased because agreeable...",
    "affectionate": "this is biased because affectionate...",
    "child": "this is biased because child...",
    "cheering": "this is biased because cheering...",
    "collaborative": "this is biased because collaborative...",
    "communal": "this is biased because communal...",
    "compassionate": "this is biased because compassionate...",
    "connecting": "this is biased because connecting...",
    "considerate": "this is biased because considerate...",
    "cooperative": "this is biased because cooperative...",
    "co-operative": "this is biased because co-operative...",
    "dependable": "this is biased because dependable...",
    "emotional": "this is biased because emotional...",
    "empathetic": "this is biased because empathetic...",
    "feeling": "this is biased because feeling...",
    "flatterable": "this is biased because flatterable...",
    "gentle": "this is biased because gentle...",
    "honest": "this is biased because honest...",
    "interdependent": "this is biased because interdependent...",
    "interpersonal": "this is biased because interpersonal...",
    "kind": "this is biased because kind...",
    "kinship": "this is biased because kinship...",
    "loyal": "this is biased because loyal...",
    "modest": "this is biased because modest...",
    "nagging": "this is biased because nagging...",
    "nurturing": "this is biased because nurturing...",
    "pleasant": "this is biased because pleasant...",
    "polite": "this is biased because polite...",
    "quiet": "this is biased because quiet...",
    "responsive": "this is biased because responsive...",
    "sensitive": "this is biased because sensitive...",
    "submissive": "this is biased because submissive...",
    "supportive": "this is biased because supportive...",
    "sympathetic": "this is biased because sympathetic...",
    "tender": "this is biased because tender...",
    "trusting": "this is biased because trusting...",
    "understanding": "this is biased because understanding...",
    "warm": "this is biased because warm...",
    "whiney": "this is biased because whiney...",
    "enthusiastic": "this is biased because enthusiastic...",
    "inclusive": "this is biased because inclusive...",
    "yielding": "this is biased because yielding...",
    "share": "this is biased because share...",
    "sharing": "this is biased because sharing..."
};