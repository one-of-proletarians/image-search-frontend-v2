"use client";
import { Button } from "@nextui-org/button";
import { Trash2 } from "lucide-react";
import { FC, useEffect, useId, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import { useFormStatus } from "react-dom";

import { ImageGallery } from "./ImageGallery";
import { InputImage } from "./InputImage";

interface ItemProps {
  onRemove: () => void;
  isRemovable?: boolean;
  onValidChange: (valid: boolean) => void;
}

export const Item: FC<ItemProps> = ({
  onRemove,
  onValidChange,
  isRemovable,
}) => {
  const itemId = useId();
  const [images, setImages] = useState<File[]>([]);
  const { pending } = useFormStatus();
  const {
    register,
    formState: { isValid },
  } = useForm();

  useEffect(() => {
    onValidChange(images.length > 0 && isValid);
  }, [images, isValid]);

  return (
    <li key={itemId} className="flex gap-2 w-full">
      <Card className="w-full">
        <CardBody>
          <ul className="flex gap-2 overflow-y-hidden overflow-x-auto p-1 flex-wrap mb-1">
            <InputImage
              multiple
              isDisabled={pending}
              maxFiles={20}
              name={`${itemId}--image`}
              onChange={setImages}
            />
            <ImageGallery images={images} />
          </ul>

          <Textarea
            isDisabled={pending}
            placeholder="Description"
            {...register(`${itemId}--description`, {
              maxLength: 300,
              required: true,
            })}
          />

          <Button
            isIconOnly
            className="absolute top-2 right-2"
            color="danger"
            isDisabled={!isRemovable || pending}
            size="sm"
            type="button"
            onClick={onRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardBody>
      </Card>
    </li>
  );
};
