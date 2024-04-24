<div class="mb-3 {{ $ft_widthClass }}" @if(isset($ft_container_id)) id="{{$ft_container_id}}" @endif>
    <label for="{{ $ft_1_variable }}" class="form-label">{{ $ft_text }}</label>
    <div class="input-group" id="{{ $ft_group_id }}">
        <input type="{{ $ft_1_type }}" class="form-control text-end @error($ft_1_variable) is-invalid @enderror" id="{{ $ft_1_variable }}"
                name="{{ $ft_1_variable }}" value="{{ old($ft_1_variable, $ft_1_value) }}" @if($ft_1_required) required @endif
                {{-- Numeric --}}
                @isset($ft_1_min) min="{{$ft_1_min}}" @endisset @isset($ft_1_max) max="{{$ft_1_max}}" @endisset @isset($ft_1_step) step="{{$ft_1_step}}" @endisset
                >
        <span class="input-group-text">{{$ft_separator}}</span>

        <input type="{{ $ft_2_type }}" class="form-control @error($ft_2_variable) is-invalid @enderror" id="{{ $ft_2_variable }}"
                name="{{ $ft_2_variable }}" value="{{ old($ft_2_variable, $ft_2_value) }}" @if($ft_2_required) required @endif
                {{-- Numeric --}}
                @isset($ft_2_min) min="{{$ft_2_min}}" @endisset @isset($ft_2_max) max="{{$ft_2_max}}" @endisset @isset($ft_2_step) step="{{$ft_2_step}}" @endisset
                >
    </div>
    @error($ft_1_variable)
        <div class="invalid-feedback d-block">{{ $message }}</div>
    @enderror
    @error($ft_2_variable)
        <div class="invalid-feedback d-block">{{ $message }}</div>
    @enderror
</div>
