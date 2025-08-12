'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const PostAnimation = dynamic(
  () => import("@/components/PostAnimation"),
  { ssr: false }
);

interface PostAnimationWrapperProps {
  children: ReactNode;
}

export default function PostAnimationWrapper({ children }: PostAnimationWrapperProps) {
  return <PostAnimation>{children}</PostAnimation>;
}