import { invalidate } from "@/utils/isr";

export async function GET() {
  invalidate('/time');
  return new Response(JSON.stringify({
    status: 'success',
    message: 'Succesfully revalidated'
  }));
}
