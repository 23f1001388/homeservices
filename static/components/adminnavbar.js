const AdminNavbar={
    template:`<div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-light navbar-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">A-Z</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to='/' class="nav-link active" aria-current="page">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/about' class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to='/contact' class="nav-link" >Contact</router-link>
            </li>
           
          </ul>
         
         <form class="d-flex">
         <div class="input-group">
         <input class="form-control" type="search" placeholder="Search" aria-label="Search">
           <button class="btn btn-primary me-2" type="submit">Search</button>
           </div>
         </form>
         
         <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle"></i>
            </button>
            
            <div class="dropdown-menu dropdown-menu-start dropdown-menu-lg-end dropdown-menu-light">
              <div class="d-flex p-1">
                <div class="flex-fill border me-2">
                  <ul class="list-unstyled">
                    <li><h6 class="text-center">Login As</h6></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><router-link class="dropdown-item" to="/login">Admin</router-link></li>
                    <li><router-link class="dropdown-item" to="/login">Professional</router-link></li>
                    <li><router-link class="dropdown-item" to="/login">Customer</router-link></li>
                  </ul>
                </div>
                
                <div class="flex-fill border ">
                  <ul class="list-unstyled">
                    <li><h6 class="text-center">Register As</h6></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><router-link class="dropdown-item" to="/register/professional">Professional</router-link></li>
                    <li><router-link class="dropdown-item" to="/register/customer">Customer</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>`,
}