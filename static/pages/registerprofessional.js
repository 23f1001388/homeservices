const RegisterProfessional={
  template:`
    <div class="row justify-content-center p-3">
    <div class="col-md-4 shadow-lg border p-2">
    <div class="p-2">

      <h4 class="text-center">Service Professional SignUp</h4>

        <div class="form-floating mb-3 mt-3">
          <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com" required>
          <label for="email">Email address</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
          <label for="password">Password</label>
        </div>
        
        <div class="form-floating mt-3">
          <input type="text" class="form-control" id="name" name="name" placeholder="Full Name" required>
          <label for="name">Full Name</label>
        </div>
        
        <div class="form-floating mt-3">
        <select class="form-select" id="service" aria-label="service" name='service'>
          <option selected>Select Service</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <label for="campaigntype">Please Select User Type</label>
      </div>


        <div class="form-floating mt-3">
          <input type="number" class="form-control" id="experience" name="experience" placeholder="Experience in Years" required>
          <label for="service">Experience in Years</label>
        </div>

        <div class="form-floating mt-3">
          <textarea class="form-control" id="address" name="address" placeholder="Complete Address" required></textarea>
          <label for="address">Complete Address</label>
        </div>
        
        <div class="form-floating mt-3">
          <input type="number" class="form-control" id="pincode" name="pincode" placeholder="PIN Code" required>
          <label for="pincode">PIN Code</label>
        </div>
        
        <div class="text-center mt-3">
          <button class="btn btn-primary">Sign Up</button>
        </div>
        <div class='text-center'>
          <h6>Already have an account ? <router-link to='/Login'>Login</router-link></h6>
        </div>
       </div>
    </div>
    </div>
  `
}

export default RegisterProfessional