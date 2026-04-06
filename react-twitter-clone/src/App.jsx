import { useMemo, useState } from 'react';

const maxTweetLength = 280;

const starterTweets = [
  {
    id: 1,
    author: 'Codex Dev',
    handle: '@codexdev',
    text: 'Welcome! This is a Twitter-style feed built with React. 🚀',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    likes: 12,
    retweets: 3
  },
  {
    id: 2,
    author: 'UI Bot',
    handle: '@uibot',
    text: 'Post your first tweet using the composer above.',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    likes: 6,
    retweets: 1
  }
];

function formatTime(isoDate) {
  const diffMinutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);

  if (diffMinutes < 1) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

function App() {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState(starterTweets);

  const remainingChars = maxTweetLength - tweet.length;
  const isTooLong = remainingChars < 0;

  const timeline = useMemo(
    () => [...tweets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [tweets]
  );

  function publishTweet(event) {
    event.preventDefault();

    const trimmed = tweet.trim();
    if (!trimmed || trimmed.length > maxTweetLength) return;

    const newTweet = {
      id: Date.now(),
      author: 'You',
      handle: '@you',
      text: trimmed,
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0
    };

    setTweets((currentTweets) => [newTweet, ...currentTweets]);
    setTweet('');
  }

  return (
    <div className="page">
      <aside className="leftRail">
        <h1>Mini Twitter</h1>
        <p>React tweet feed demo</p>
      </aside>

      <main className="timelineCard">
        <h2>Home</h2>

        <form className="tweetComposer" onSubmit={publishTweet}>
          <textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(event) => setTweet(event.target.value)}
            rows={4}
          />

          <div className="composerFooter">
            <span className={isTooLong ? 'limitError' : 'limitOkay'}>{remainingChars}</span>
            <button type="submit" disabled={isTooLong || !tweet.trim()}>
              Tweet
            </button>
          </div>
        </form>

        <section className="feed" aria-label="Tweet feed">
          {timeline.map((post) => (
            <article key={post.id} className="tweetCard">
              <header>
                <strong>{post.author}</strong>
                <span>{post.handle}</span>
                <time dateTime={post.createdAt}>{formatTime(post.createdAt)}</time>
              </header>

              <p>{post.text}</p>

              <footer>
                <span>💬</span>
                <span>🔁 {post.retweets}</span>
                <span>❤️ {post.likes}</span>
              </footer>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
