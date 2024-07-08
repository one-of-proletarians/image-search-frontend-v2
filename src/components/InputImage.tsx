"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ImagePlus, X } from "lucide-react";
import mergeRefs from "merge-refs";
import { forwardRef, useRef, useState } from "react";

interface InputFileProps {
  name: string;
  multiple?: boolean;
  maxFiles?: number;
  isDisabled?: boolean;

  onChange: (files: File[]) => void;
}

export const InputImage = forwardRef<HTMLInputElement, InputFileProps>(
  ({ onChange, maxFiles, isDisabled, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const { isOpen, onOpenChange } = useDisclosure();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      if (maxFiles && files.length > maxFiles) {
        inputRef.current!.value = "";
        onOpenChange();
      } else {
        onChange(files);
        setIsFileSelected(true);
      }
    };

    const reset = () => {
      inputRef.current!.value = "";
      setIsFileSelected(false);
      onChange([]);
    };

    return (
      <>
        <input
          ref={mergeRefs(ref, inputRef)}
          hidden
          required
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          {...rest}
        />
        <li className="!w-28 !h-28 flex flex-col gap-2">
          <Button
            className="flex-1"
            isDisabled={isDisabled}
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus />
          </Button>
          <Button
            className="flex-1"
            color="danger"
            isDisabled={!isFileSelected || isDisabled}
            onClick={reset}
          >
            <X />
          </Button>
        </li>

        <Modal backdrop="blur" isOpen={isOpen} onClose={onOpenChange}>
          <ModalContent>
            <ModalHeader>
              <p>
                Вы можете выбрать не более
                <span className="font-bold text-red-500"> {maxFiles} </span>
                файла.
              </p>
            </ModalHeader>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

InputImage.displayName = "InputImage";
