"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { FC, useEffect, useId, useRef, useState, type DragEvent } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

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

  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files) {
      const dataTransfer = new DataTransfer();

      Array.from(e.dataTransfer.files).forEach((file) => {
        if (!file.type.includes("image")) return;
        dataTransfer.items.add(file);
      });

      inputRef.current!.files = dataTransfer.files;
      const event = new Event("change", { bubbles: true });

      inputRef.current!.dispatchEvent(event);
    }
  };

  const dragHandlers = {
    onDrop,
    onDragEnd: () => setDrag(false),
    onDragEnter: () => setDrag(true),
    onDragLeave: () => setDrag(false),
    onDragOver: (e: DragEvent<HTMLInputElement>) => {
      e.preventDefault();
      setDrag(true);
    },
  };

  return (
    <li
      key={itemId}
      className={clsx("flex gap-2 w-full", { "opacity-80": drag })}
    >
      <Card className="w-full relative overflow-hidden" {...dragHandlers}>
        <AnimatePresence>
          {drag && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute flex items-center justify-center inset-0 z-50 font-bold text-xl text-white bg-black/80 border-dashed border-3 rounded-large"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              Перетащите ваши изображения сюда
            </motion.div>
          )}
        </AnimatePresence>

        <CardBody>
          <ul className="flex gap-2 overflow-y-hidden overflow-x-auto p-1 flex-wrap mb-1">
            <InputImage
              ref={inputRef}
              multiple
              isDisabled={pending}
              maxFiles={10}
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
