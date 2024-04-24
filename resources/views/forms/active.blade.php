<div class="mb-3 {{ $ft_widthClass }}">
    <label for="{{ $ft_variable }}" class="form-label">{{ $ft_text }}</label>
    <select class="form-select" id="{{ $ft_variable }}" name="{{ $ft_variable }}" @if($ft_required) required @endif>
        @if ($ft_current == 1)
            <option selected value=1>Tak</option>
            <option value=0>Nie</option>
        @else
            <option value=1>Tak</option>
            <option selected value=0>Nie</option>
        @endif
    </select>
</div>
