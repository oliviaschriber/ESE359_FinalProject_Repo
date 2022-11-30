
male_terms_job = ["active", "adventurous", "aggressive", "ambitious", "analytic", "assertive", "athletic", "autonomous", "battle", "boastful", "challenge", "champion", "competitive", "confident", "courageous", "decide", "decision", "decisive", "defend", "determined", "dominating", "dominant", "driven", "fearless", "fight", "forceful", "greedy", "head-strong", "headstrong", "hierarchical", "hostile", "impulsive", "independent", "individual", "intellectual", "lead", "logical", "objective", "opinionated", "outspoken", "persistent", "principle", "reckless", "self-confident", "self-reliant", "self-sufficient", "stubborn", "superior", "unreasonable"];
female_terms_job = ["agreeable", "affectionate", "child", "cheering", "collaborative", "communal", "compassionate", "connecting", "considerate", "cooperative", "co-operative", "dependable", "emotional", "empathetic", "feeling", "flatterable", "gentle", "honest", "interdependent", "interpersonal", "kind", "kinship", "loyal", "modest", "nagging", "nurturing", "pleasant", "polite", "quiet", "responsive", "sensitive", "submissive", "supportive", "sympathetic", "tender", "trusting", "understanding", "warm", "whiney", "enthusiastic", "inclusive", "yielding", "share", "sharing"];
suggestions = [];

function submittext(){
    inputtext = '';
    outputtext = '';

    inputtext = document.getElementById("input_field").value;

    if(inputtext.substring(0,4) == 'http'){
        urltext = getURLText(inputtext);
        inputtext = "<b id=nourl>" + urltext + "</b>";
    }

    outputtext = bias_detector(inputtext,male_terms_job,"biased_m");

    outputtext = bias_detector(outputtext,female_terms_job,"biased_f");

    if(suggestions.length != 0){
        outputtext = bias_detector(outputtext,suggestions,"biased_s");
        counts_s = listToString(count_terms(inputtext,suggestions, "biased_s"));
        document.getElementById('count_output_s').innerHTML = counts_s;
        document.getElementById('s_out_title').innerHTML = "Suggested Biased Terms";
    }

    document.getElementById('final_output').innerHTML = outputtext;

    counts_m = listToString(count_terms(inputtext,male_terms_job, "biased_m"));
    document.getElementById('count_output_m').innerHTML = counts_m;
    counts_f = listToString(count_terms(inputtext,female_terms_job, "biased_f"));
    document.getElementById('count_output_f').innerHTML = counts_f;

    document.getElementById('male_explanation').innerHTML = male_ex;
    document.getElementById('female_explanation').innerHTML = female_ex;
    document.getElementById('male_out_title').innerHTML = "Male Biased Terms";
    document.getElementById('female_out_title').innerHTML = "Female Biased Terms";
    document.getElementById('male_out_title2').innerHTML = "Male Biased Terms";
    document.getElementById('female_out_title2').innerHTML = "Female Biased Terms";
}

function submitsuggestions() {
    suggest_input = '';
    suggest_list = [];

    suggest_input = document.getElementById("suggestions").value;
    suggest_input = suggest_input.toLowerCase();
    suggest_list = suggest_input.split(" ");
    suggestions = suggest_list;
    console.log(suggestions);
    document.getElementById('confirmation').innerHTML = "Thank you! Submit or resubmit input to bias detector to detect these suggestions.";
}

function listToString(list){
    text = '';
    for (let i = 0; i < list.length; i++) {
        text += list[i] + " ";
    }
    return text;
}

function bias_detector(in_text, terms, id_string){
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
            temp_element2 = element2.toLowerCase();
            theWhy = whyBiased(temp_element2.replace(/[^\w\s\']|_/g, ""));
            temp_string = "<b title=\"" + theWhy + "\" id=" +  id_string + ">";
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

function count_terms(in_text,terms, id_string){
    
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
            counts = "<b id=" + id_string + ">" + element + ": " + temp_count + "</b>" + ", ";
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

var male_ex = "The words above are masculine-coded as they lean towards the masculine stereotypes of aggression and stubbornness, especially in the workforce. The terms have been used historically to subtly hint at / attract male candidates to jobs using these words in their descriptions. \"Thus, eliminating the use of incidental masculine wording in job advertisements may not only increase the numbers of women in these occupations but change the female stereotype to include more agentic traits, leading to greater numbers of women seeking training in these occupations.\"";
var female_ex = "The words above are feminine-coded as they lean towards the female stereotypes of being passive and more confused on human connection and empathy in the workforce. The terms have been used historically to subtly hint at /attract female candidates to jobs using these words in their descriptions, and deter female candidates from jobs that contain male-coded terms. \"Regardless of the type of job, participants, particularly women, ranked jobs most highly when they included words that matched their gender.\"";
var male_l = "<a href=\"https://gender-decoder.katmatfield.com/static/documents/Gaucher-Friesen-Kay-JPSP-Gendered-Wording-in-Job-ads.pdf\" target=\"_blank\">Male Biased Terms</a>";
var female_l = "<a href=\"https://gender-decoder.katmatfield.com/static/documents/Gaucher-Friesen-Kay-JPSP-Gendered-Wording-in-Job-ads.pdf\" target=\"_blank\">Female Biased Terms</a>";

var whys_dict = {
    "active": "Alternatively, use operational.",
    "adventurous": "Alternatively, use brave.",
    "aggressive": "Alternatively, use thoughtful.",
    "ambitious": "Alternatively, use enthusiastic.",
    "analytic": "Alternatively, use thoughtul.",
    "assertive": "Alternatively, use team player.",
    "athletic": "Alternatively, use motivated.",
    "autonomous": "Alternatively, use team player.",
    "battle": "Alternatively, use connect.",
    "boastful": "Alternatively, use caring.",
    "challenge": "Alternatively, use compare.",
    "champion": "Alternatively, use team player.",
    "competitive": "Alternatively, use team player.",
    "confident": "Alternatively, use enthusiastic.",
    "courageous": "Alternatively, use brave.",
    "decide": "Alternatively, use connect.",
    "decision": "Alternatively, use result.",
    "decisive": "Alternatively, use caring.",
    "defend": "Alternatively, use firm.",
    "determined": "Alternatively, use settled.",
    "dominating": "Alternatively, use team player.",
    "dominant": "Alternatively, use motivated.",
    "driven": "Alternatively, use caring.",
    "fearless": "Alternatively, use caring.",
    "fight": "Alternatively, use converse.",
    "forceful": "Alternatively, use caring.",
    "greedy": "Alternatively, use caring.",
    "head-strong": "Alternatively, use thoughtful.",
    "headstrong": "Alternatively, use thoughtful.",
    "hierarchical": "Alternatively, use team player.",
    "hostile": "Alternatively, use caring.",
    "impulsive": "Alternatively, use brave.",
    "independent": "Alternatively, use team player.",
    "individual": "Alternatively, use team player.",
    "intellectual": "Alternatively, use thoughtful.",
    "lead": "Alternatively, use listen.",
    "logical": "Alternatively, use thoughtful.",
    "objective": "Alternatively, use thoughtful.",
    "opinionated": "Alternatively, use team player.",
    "outspoken": "Alternatively, use team player.",
    "persistent": "Alternatively, use consistent.",
    "principle": "Alternatively, use team player.",
    "reckless": "Alternatively, use thoughtful.",
    "self-confident": "Alternatively, use team player.",
    "self-reliant": "Alternatively, use team player.",
    "self-sufficient": "Alternatively, use team player.",
    "stubborn": "Alternatively, use firm.",
    "superior": "Alternatively, use correct.",
    "unreasonable": "Alternatively, use firm.",

    "agreeable": "Alternatively, use smart.",
    "affectionate": "Alternatively, use smart.",
    "child": "Alternatively, use independent.",
    "cheering": "Alternatively, use smart.",
    "collaborative": "Alternatively, use thoughtful.",
    "communal": "Alternatively, use thoughtful.",
    "compassionate": "Alternatively, use thoughtful.",
    "connecting": "Alternatively, use thoughtful.",
    "considerate": "Alternatively, use thoughtful.",
    "cooperative": "Alternatively, use team player.",
    "co-operative": "Alternatively, use team player.",
    "dependable": "Alternatively, use team player.",
    "emotional": "Alternatively, use thoughtful.",
    "empathetic": "Alternatively, use smart.",
    "feeling": "Alternatively, use thoughtful.",
    "flatterable": "Alternatively, use thoughtful.",
    "gentle": "Alternatively, use thoughtful.",
    "honest": "Alternatively, use true.",
    "interdependent": "Alternatively, use team player.",
    "interpersonal": "Alternatively, use team player.",
    "kind": "Alternatively, use thoughtful.",
    "kinship": "Alternatively, use team.",
    "loyal": "Alternatively, use team player.",
    "modest": "Alternatively, use smart.",
    "nagging": "Alternatively, use smart.",
    "nurturing": "Alternatively, use team player.",
    "pleasant": "Alternatively, use smart.",
    "polite": "Alternatively, use smart.",
    "quiet": "Alternatively, use smart.",
    "responsive": "Alternatively, use smart.",
    "sensitive": "Alternatively, use team player.",
    "submissive": "Alternatively, use team player.",
    "supportive": "Alternatively, use team player.",
    "sympathetic": "Alternatively, use thoughtful.",
    "tender": "Alternatively, use thoughtful.",
    "trusting": "Alternatively, use smart.",
    "understanding": "Alternatively, use smart.",
    "warm": "Alternatively, use thoughtful.",
    "whiney": "Alternatively, use thoughtful.",
    "enthusiastic": "Alternatively, use team player.",
    "inclusive": "Alternatively, use team player.",
    "yielding": "Alternatively, use thoughtful.",
    "share": "Alternatively, use contribute.",
    "sharing": "Alternatively, use contributive."
};