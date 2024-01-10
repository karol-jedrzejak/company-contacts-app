<nav class="navbar navbar-expand-xl navbar-dark bg-dark fixed-top" aria-label="Navigation Bar">
    <div class="container-fluid">
      <span class="navbar-brand text-info"><strong>CCA</strong></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navi" aria-controls="main-navi" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="main-navi">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                <img src="{{ URL::to('/') }}/images/icons/companies.svg" class="navi-icon">
                Companies</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                <img src="{{ URL::to('/') }}/images/icons/sales.svg" class="navi-icon">
                Sales Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                <img src="{{ URL::to('/') }}/images/icons/calendar.svg" class="navi-icon">
                Calendar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                <img src="{{ URL::to('/') }}/images/icons/tasklist.svg" class="navi-icon">
                Tasklist</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
                <img src="{{ URL::to('/') }}/images/icons/logout.svg" class="navi-icon">
                Logout</a>
          </li>

{{--
    <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
--}}

        </ul>
      </div>
    </div>
</nav>
