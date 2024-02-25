// Code: Header component for auth pages
interface HeaderProps {
  label: string;
  title?: string;
}

export const Header = ({ title = " 💬 DraftChat", label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <h1 className="text-2xl font-semibold text-center text-primary">
        {title}
      </h1>
      <h3 className="text-xl font-normal text-center tracking-tight text-gray-600">
        {label}
      </h3>
    </div>
  );
};
