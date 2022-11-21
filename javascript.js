
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
    "active": "This is potentially a male biased term.",
    "adventurous": "This is potentially a male biased term.",
    "aggressive": "This is potentially a male biased term.",
    "ambitious": "This is potentially a male biased term.",
    "analytic": "This is potentially a male biased term.",
    "assertive": "This is potentially a male biased term.",
    "athletic": "This is potentially a male biased term.",
    "autonomous": "This is potentially a male biased term.",
    "battle": "This is potentially a male biased term.",
    "boastful": "This is potentially a male biased term.",
    "challenge": "This is potentially a male biased term.",
    "champion": "This is potentially a male biased term.",
    "competitive": "This is potentially a male biased term.",
    "confident": "This is potentially a male biased term.",
    "courageous": "This is potentially a male biased term.",
    "decide": "This is potentially a male biased term.",
    "decision": "This is potentially a male biased term.",
    "decisive": "This is potentially a male biased term.",
    "defend": "This is potentially a male biased term.",
    "determined": "This is potentially a male biased term.",
    "dominating": "This is potentially a male biased term.",
    "dominant": "This is potentially a male biased term.",
    "driven": "This is potentially a male biased term.",
    "fearless": "This is potentially a male biased term.",
    "fight": "This is potentially a male biased term.",
    "forceful": "This is potentially a male biased term.",
    "greedy": "This is potentially a male biased term.",
    "head-strong": "This is potentially a male biased term.",
    "headstrong": "This is potentially a male biased term.",
    "hierarchical": "This is potentially a male biased term.",
    "hostile": "This is potentially a male biased term.",
    "impulsive": "This is potentially a male biased term.",
    "independent": "This is potentially a male biased term.",
    "individual": "This is potentially a male biased term.",
    "intellectual": "This is potentially a male biased term.",
    "lead": "This is potentially a male biased term.",
    "logical": "This is potentially a male biased term.",
    "objective": "This is potentially a male biased term.",
    "opinionated": "This is potentially a male biased term.",
    "outspoken": "This is potentially a male biased term.",
    "persistent": "This is potentially a male biased term.",
    "principle": "This is potentially a male biased term.",
    "reckless": "This is potentially a male biased term.",
    "self-confident": "This is potentially a male biased term.",
    "self-reliant": "This is potentially a male biased term.",
    "self-sufficient": "This is potentially a male biased term.",
    "stubborn": "This is potentially a male biased term.",
    "superior": "This is potentially a male biased term.",
    "unreasonable": "This is potentially a male biased term.",

    "agreeable": "This is potentially a female biased term.",
    "affectionate": "This is potentially a female biased term.",
    "child": "This is potentially a female biased term.",
    "cheering": "This is potentially a female biased term.",
    "collaborative": "This is potentially a female biased term.",
    "communal": "This is potentially a female biased term.",
    "compassionate": "This is potentially a female biased term.",
    "connecting": "This is potentially a female biased term.",
    "considerate": "This is potentially a female biased term.",
    "cooperative": "This is potentially a female biased term.",
    "co-operative": "This is potentially a female biased term.",
    "dependable": "This is potentially a female biased term.",
    "emotional": "This is potentially a female biased term.",
    "empathetic": "This is potentially a female biased term.",
    "feeling": "This is potentially a female biased term.",
    "flatterable": "This is potentially a female biased term.",
    "gentle": "This is potentially a female biased term.",
    "honest": "This is potentially a female biased term.",
    "interdependent": "This is potentially a female biased term.",
    "interpersonal": "This is potentially a female biased term.",
    "kind": "This is potentially a female biased term.",
    "kinship": "This is potentially a female biased term.",
    "loyal": "This is potentially a female biased term.",
    "modest": "This is potentially a female biased term.",
    "nagging": "This is potentially a female biased term.",
    "nurturing": "This is potentially a female biased term.",
    "pleasant": "This is potentially a female biased term.",
    "polite": "This is potentially a female biased term.",
    "quiet": "This is potentially a female biased term.",
    "responsive": "This is potentially a female biased term.",
    "sensitive": "This is potentially a female biased term.",
    "submissive": "This is potentially a female biased term.",
    "supportive": "This is potentially a female biased term.",
    "sympathetic": "This is potentially a female biased term.",
    "tender": "This is potentially a female biased term.",
    "trusting": "This is potentially a female biased term.",
    "understanding": "This is potentially a female biased term.",
    "warm": "This is potentially a female biased term.",
    "whiney": "This is potentially a female biased term.",
    "enthusiastic": "This is potentially a female biased term.",
    "inclusive": "This is potentially a female biased term.",
    "yielding": "This is potentially a female biased term.",
    "share": "This is potentially a female biased term.",
    "sharing": "This is potentially a female biased term."
};