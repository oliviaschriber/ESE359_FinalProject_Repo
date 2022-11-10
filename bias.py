import requests
from bs4 import BeautifulSoup
import colorama
from colorama import Fore

male_terms_job = ["active", "adventurous", "aggressive", "ambitious", "analytic", "assertive", "athletic", "autonomous", "battle", "boastful", "challenge", "champion", "competitive", "confident", "courageous", "decide", "decision", "decisive", "defend", "determined", "dominating", "dominant", "driven", "fearless", "fight", "forceful", "greedy", "head-strong", "headstrong", "hierarchical", "hostile", "impulsive", "independent", "individual", "intellectual", "lead", "logical", "objective", "opinionated", "outspoken", "persistent", "principle", "reckless", "self-confident", "self-reliant", "self-sufficient", "stubborn", "superior", "unreasonable"]
female_terms_job = ["agreeable", "affectionate", "child", "cheering", "collaborative", "communal", "compassionate", "connecting", "considerate", "cooperative", "co-operative", "dependable", "emotional", "empathetic", "feeling", "flatterable", "gentle", "honest", "interdependent", "interpersonal", "kind", "kinship", "loyal", "modest", "nagging", "nurturing", "pleasant", "polite", "quiet", "responsive", "sensitive", "submissive", "supportive", "sympathetic", "tender", "trusting", "understanding", "warm", "whiney", "enthusiastic", "inclusive", "yielding", "share", "sharing"]

def listToString(list):
	string = ""
	for each in list:
		string += each
	return string

def bias_detection(terms):

	url = "https://www.vanityfair.com/news/2022/10/marjorie-taylor-greene-abortion-call-in" # Scraped from Web
	page = requests.get(url)

	soup = BeautifulSoup(page.text,'html.parser')
	soup_text = soup.get_text()

	soup_arr = soup_text.split()

	count = 0
	term_indices = []
	for word in soup_arr:
		if word in terms:
			term_indices.append(count) # index of word in list

		count = count + 1

	count2 = 0
	for word in soup_arr:
		if count2 in term_indices:
			print(Fore.RED + str(word) + Fore.GREEN, end=' ')
		else: 
			print(Fore.GREEN + str(word), end=' ')
		count2 = count2 + 1

	print('\ncounts by bias terms:')
	for each in terms:
		print(str(each) + ': ' + str(soup_arr.count(each)))

print('Male_terms in job ads: ')
bias_detection(male_terms_job)
print('\nFemale_terms in job ads: ')
bias_detection(female_terms_job)
