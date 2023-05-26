
import praw
import pandas as pd
import time
import tqdm

reddit = praw.Reddit(client_id='test', client_secret='test_', user_agent='BayMax')

posts = []
sb = reddit.subreddit('roastme')
for post in sb.top(limit=10000):
    posts.append([post.title, post.score, post.id, post.subreddit,
                 post.url, post.num_comments, post.selftext, post.created])
posts = pd.DataFrame(posts, columns=[
                     'title', 'score', 'id', 'subreddit', 'url', 'num_comments', 'body', 'created'])
submission_ids = posts['id'].values

def get_comments(submission_id):
    submission = reddit.submission(id=submission_id)
    # get top scored comment
    submission.comment_sort = 'top'
    submission.comment_limit = 1
    top_comment = submission.comments[0]
    return top_comment.body

# add comments to dataframe
comments = []
for submission_id in tqdm.tqdm(submission_ids):
    comments.append(get_comments(submission_id))
    time.sleep(1)
posts['comments'] = comments


# save to csv
posts.to_csv('reddit.csv', index=False)


