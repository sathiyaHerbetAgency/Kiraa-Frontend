import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <>
     <Separator className="border-[#000] border-t-2" />
    <footer className=" h-14 --center-all">
     
      <div className="container flex-center">
        <p className="text-sm text-black">
          © Kirakira - All Rights Reserved
        </p>
      </div>
    </footer>
    </>
  );
}
