"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditPostFormProps {
  editTitle: string;
  setEditTitle: (title: string) => void;
  editContent: string;
  setEditContent: (content: string) => void;
  editImage: string;
  setEditImage: (image: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const EditPostForm = ({
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
  editImage,
  setEditImage,
  onCancel,
  onSubmit,
}: EditPostFormProps) => (
  <form className="container mx-auto max-w-3xl px-4" onSubmit={onSubmit}>
    <Card>
      <CardHeader>
        <CardTitle>Editar post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Informe o título do post"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              className="min-h-[200px]"
              id="content"
              placeholder="Informe o conteúdo do post"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="Informe o URL da imagem"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          disabled={!editTitle || !editContent || !editImage}
          type="submit"
        >
          Salvar
        </Button>
      </CardFooter>
    </Card>
  </form>
);
