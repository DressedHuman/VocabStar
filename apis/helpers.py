import random

# helper function to generate a mcq
def gen_mcq(owner_words, word):
    # generating correct option
    correct_meaning = ", ".join(
        list(
            map(
                lambda word: word.meaning,
                word.meanings.all(),
            )
        )
    )

    # generating incorrect options
    other_words = list(owner_words.exclude(word=word)[:3])
    incorrect_meanings = list(
        map(
            lambda word: ", ".join(
                [meaning.meaning for meaning in word.meanings.all()]
            ),
            other_words,
        )
    )

    # creating randomized options
    options = [correct_meaning] + incorrect_meanings
    random.shuffle(options)

    return {
        "question": f"What is/are the meaning of the word '{word.word.capitalize()}'?",
        "options": options,
        "correct_answer": correct_meaning,
    }