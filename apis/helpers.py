import random
from vocab.serializers import WordSerializer2

# helper function to generate word, meanings data dictionary
def get_word_meaning(word):
    """ meanings = ", ".join([meaning.meaning for meaning in word.meanings.all()])
    return {
        "id": word.id,
        "word": word.word,
        "meaning": meanings,
    } """
    meanings = WordSerializer2(instance=word)
    return meanings.data


# helper function to generate an e2b mcq
def gen_e2b_mcq(owner_words, word):
    correct_meaning = {
        "id": word.id,
        "value": ", ".join([meaning.meaning for meaning in word.meanings.all()]),
    }

    # generating incorrect options
    other_words = list(owner_words.exclude(id=word.id).order_by("?")[:3])
    incorrect_meanings = [
        {
            "id": word.id,
            "value": ", ".join([meaning.meaning for meaning in word.meanings.all()]),
        }
        for word in other_words
    ]

    # creating randomized options
    options = [correct_meaning] + incorrect_meanings
    random.shuffle(options)

    return {
        "question": f'Which of the following refer(s) to the word "{word.word.capitalize()}"?',
        "options": options,
        "correct_answer": correct_meaning,
    }


# helper function to generate a b2e mcq
def gen_b2e_mcq(words, word):
    correct_word = {
        "id": word.id,
        "value": word.word,
    }
    correct_word_meaning = ", ".join(
        [meaning.meaning for meaning in word.meanings.all()]
    )

    # generating incorrect options
    other_words = words.exclude(word=word.word).order_by("?")[:3]
    incorrect_words = [
        {
            "id": word.id,
            "value": word.word,
        }
        for word in other_words
    ]

    # creating randomized options
    options = [correct_word] + incorrect_words
    random.shuffle(options)

    return {
        "question": f'"{correct_word_meaning}" এর ইংরেজি পরিভাষা কোনটি?',
        "options": options,
        "correct_answer": correct_word,
    }
