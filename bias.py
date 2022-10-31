import requests

pronouns = ['she', 'her', 'woman']
text = "she is a woman" #Scraped from web
words = text.split(' ')
print(words)

url = "https://www.vanityfair.com/news/2022/10/marjorie-taylor-greene-abortion-call-in"
page = requests.get(url)

# print(page.text)

def bias_detection():
    bias_count = 0
    for i in pronouns:
        if i in words:
            bias_count = bias_count + 1
    return bias_count


print(bias_detection())


