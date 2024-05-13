import Link from "next/link";

async function fakeDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "This is a fake delay to simulate a slow network request response"
      );
    }, 300);
  });
}

export default async function Posts() {
  let postsResponse = null;

  try {
    postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: {
        revalidate: 0,
      },
    });
  } catch (error) {
    console.error(error);

    return <div className="px-4 py-2">Falha ao carregar os posts</div>;
  }

  const posts = await postsResponse.json();
  await fakeDelay();

  return (
    <div>
      <section className="w-full py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Últimos Posts
          </h2>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
          {posts?.data.map((post: Post) => (
            <div
              className="relative group flex flex-col items-start justify-start gap-4"
              key={post.id}
            >
              <Link
                className="absolute inset-0 z-10"
                href={`/posts/${post.id}`}
              >
                <span className="sr-only">Visualizar post</span>
              </Link>
              <img
                alt="Post Image"
                className="rounded-lg object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                height="200"
                src={post.imageUrl}
                width="300"
              />
              <div className="flex flex-col items-start justify-start">
                <h3 className="font-semibold text-lg leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm leading-tight mt-2">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
