
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return <>
  <header>header</header>
  <main className="prose p-3">{children}</main>
  <footer>footer</footer>
</>

}