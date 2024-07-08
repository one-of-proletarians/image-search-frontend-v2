"use client";

import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { Item } from "./Item";

import { uid } from "@/lib/utils";
import upload from "@/actions/upload";

const getEmptyItem = () => ({ id: uid(), isValid: false });

function Component() {
  const [items, setItems] = useState([getEmptyItem()]);
  const [isValid, setIsValid] = useState(false);
  const { pending } = useFormStatus();
  const ulRef = useRef<HTMLUListElement>(null);
  const add = () => {
    setItems((items) => [...items, getEmptyItem()]);
  };
  const reset = () => setItems([getEmptyItem()]);
  const remove = (id: string) =>
    setItems((items) => items.filter((i) => i.id !== id));

  useEffect(() => setIsValid(items.every((i) => i.isValid)), [items]);

  return (
    <>
      <ul ref={ulRef} className="grid gap-2 mb-2">
        {items.map(({ id }) => (
          <Item
            key={id}
            isRemovable={items.length > 1}
            onRemove={() => remove(id)}
            onValidChange={(valid) => {
              setItems((items) =>
                items.map((i) => (i.id === id ? { ...i, isValid: valid } : i)),
              );
            }}
          />
        ))}
      </ul>

      <div className="flex justify-end gap-2">
        <Button
          className="mr-auto"
          color="danger"
          isDisabled={pending}
          type="button"
          onClick={reset}
        >
          Reset
        </Button>
        <Button
          isIconOnly
          className={clsx({ hidden: items.length > 5 })}
          isDisabled={pending || !isValid}
          type="button"
          onClick={add}
        >
          <Plus />
        </Button>
        <Button color="primary" isDisabled={pending || !isValid} type="submit">
          Upload
        </Button>
      </div>
    </>
  );
}

export const CreateForm: FC = () => {
  return (
    <form action={upload}>
      <Component />
    </form>
  );
};
