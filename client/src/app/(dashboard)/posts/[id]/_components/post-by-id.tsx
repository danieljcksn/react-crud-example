"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditPostForm } from "./edit-post-form";

export const PostById = (props: { id: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchPostById(id: string) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
        );
        const data = await response.json();

        if (data?.message !== "success") {
          throw new Error("Failed to fetch post");
        }

        setPost(data.data[0]);
        setEditTitle(data.data[0].title);
        setEditContent(data.data[0].content);
        setEditImage(data.data[0].imageUrl);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPostById(props.id);
  }, [props.id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        toast.error("Falha ao deletar o post");
        return;
      }

      toast.info("O post foi deletado.");

      startTransition(() => router.push("/posts"));
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error("Falha ao deletar o post");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            imageUrl: editImage,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Falha ao atualizar o post");
        return;
      }

      setEditMode(false);
      setPost({ ...post, title: editTitle, content: editContent } as Post);

      toast.success("As informações do post foram atualizadas.");
      router.refresh();
    } catch (err) {
      toast.error("Falha ao atualizar o post");
      console.error("Failed to update the post", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-8">
      {editMode ? (
        <EditPostForm
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editContent={editContent}
          setEditContent={setEditContent}
          editImage={editImage}
          setEditImage={setEditImage}
          onCancel={() => setEditMode(false)}
          onSubmit={handleEdit}
        />
      ) : (
        <div className="max-w-[1200px] w-[95%]">
          <article className="prose prose-gray mx-auto dark:prose-invert">
            <img
              alt="Cover image"
              className="aspect-video object-cover rounded-lg"
              height="340"
              src={post?.imageUrl}
              width="1250"
            />
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem] mt-4">
              {post?.title}
            </h1>
            <p>{post?.content}</p>
          </article>

          <div className="mt-8 flex justify-end gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Editar Post</DialogTitle>
                  <DialogDescription>
                    Edite o post com as informações desejadas.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Informe o título do post"
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Textarea
                      className="min-h-[200px]"
                      id="content"
                      placeholder="Informe o conteúdo do post"
                      value={editContent}
                      onChange={(event) => setEditContent(event.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="Informe o URL da imagem"
                      value={editImage}
                      onChange={(event) => setEditImage(event.target.value)}
                    />
                  </div>
                </div>

                <DialogFooter className="!justify-between flex flex-row items-center">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button
                      type="submit"
                      variant="default"
                      disabled={!editTitle || !editContent || !editImage}
                      onClick={handleEdit}
                    >
                      Salvar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button size="sm" variant="destructive">
                  Deletar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Tem certeza que deseja deletar o post?
                  </DialogTitle>
                  <DialogDescription>
                    Ao deletar o post, você não poderá recuperá-lo.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button size="sm" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={handleDelete}
                      size="sm"
                      type="button"
                      variant="destructive"
                    >
                      Deletar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
