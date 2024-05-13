import { PostById } from "./_components/post-by-id";

export default async function Post(props: {
  params: {
    id: string;
  };
}) {
  return <PostById id={props.params.id} />;
}
