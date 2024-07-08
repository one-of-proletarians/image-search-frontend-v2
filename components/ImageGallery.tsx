"use client";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { Image } from "@nextui-org/image";

import { useKeyPress } from "@/hooks/useKeyPress";
import { sizeFormatter } from "@/lib/utils";

interface ImageGalleryProps {
  images: File[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visibleIndex, setVisibleIndex] = useState(0);

  const open = (index: number) => {
    setVisibleIndex(index);
    onOpen();
  };

  const next = () => {
    setVisibleIndex((visibleIndex + 1) % images.length);
  };
  const prev = () => {
    setVisibleIndex((visibleIndex - 1 + images.length) % images.length);
  };

  useKeyPress("ArrowRight", next);
  useKeyPress("ArrowLeft", prev);

  return (
    <>
      {images.map((image, index) => {
        return (
          <li key={image.name} className="w-28 h-28 ">
            <button className="w-full h-full" onClick={() => open(index)}>
              <img
                alt={image.name}
                className="rounded-lg w-full h-full object-cover block"
                src={URL.createObjectURL(image)}
              />
            </button>
          </li>
        );
      })}

      <Modal isOpen={isOpen} placement="center" onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {images[visibleIndex] && images[visibleIndex].name}
          </ModalHeader>
          <ModalBody>
            {images[visibleIndex] && (
              <Image
                alt={images[visibleIndex].name}
                className="rounded-lg"
                src={URL.createObjectURL(images[visibleIndex])}
                width="100%"
              />
            )}
          </ModalBody>
          <ModalFooter className="flex justify-between items-center">
            {images[visibleIndex] && (
              <Chip className="mr-auto" color="primary">
                {sizeFormatter(images[visibleIndex].size)}
              </Chip>
            )}
            <Button isIconOnly onClick={prev}>
              <ChevronLeft />
            </Button>
            <Button isIconOnly onClick={next}>
              <ChevronRight />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
