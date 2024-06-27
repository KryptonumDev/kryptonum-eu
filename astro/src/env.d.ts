/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    cache: (seconds: number) => void;
  }
}
