import { ReactHTML } from 'react';

import parse from 'html-react-parser';

type InferProps<T> = T extends (props: infer R) => any ? R : any;

export interface InnerHTMLProps<T extends keyof ReactHTML = 'div'> {
  html?: string;
  tag: T;
  tagProps?: InferProps<ReactHTML[T]>;
}

export const InnerHTML = <T extends keyof ReactHTML = 'div'>({ html }: InnerHTMLProps<T>) => {
  return parse(html || '');
};

InnerHTML.displayName = 'InnerHTML';
