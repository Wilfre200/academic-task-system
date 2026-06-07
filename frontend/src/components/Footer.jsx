function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">

        <h6 className="mb-2">
          Academic Task System v1.0
        </h6>

        <p className="mb-1">
          Sistema de gestión académica para
          administración de usuarios y tareas.
        </p>

        <small className="text-secondary">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </small>

      </div>
    </footer>
  );
}

export default Footer;