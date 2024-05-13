"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        imageUrl: image,
      }),
    });

    if (!response.ok) {
      toast.error("Falha ao criar post");
      return;
    }

    const data = await response.json();

    if (data.message === "success") {
      toast.success("Post criado com sucesso.");

      startTransition(() => router.push("/posts"));
      startTransition(() => router.refresh());
    } else {
      toast.error("Erro ao criar post: " + data.message);
    }
  }

  return (
    <main className="flex-1 py-12">
      <form
        className="container mx-auto max-w-3xl px-4"
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader>
            <CardTitle>Criar post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Informe o título do post"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  className="min-h-[200px]"
                  id="content"
                  placeholder="Informe o conteúdo do post"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="Informe o URL da imagem"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/posts" passHref>
              <Button asChild variant="outline">
                Voltar
              </Button>
            </Link>
            <Button disabled={!title || !content || !image} type="submit">
              Criar post
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
