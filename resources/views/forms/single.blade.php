<div class="mb-3 {{ $ft_widthClass }}" @if(isset($ft_container_id)) id="{{$ft_container_id}}" @endif>
    <label for="{{ $ft_variable }}" class="form-label">{{ $ft_text }}</label>
    @if(isset($ft_group_text)) <div class="input-group"> @endif
    <input type="{{ $ft_type }}" class="form-control
    @if(isset($ft_text_end)) text-end @endif
    @if(isset($ft_group_text)) text-end @endif
    @error($ft_variable) is-invalid @enderror"
            id="{{ $ft_variable }}" name="{{ $ft_variable }}" value="{{ old($ft_variable, $ft_value) }}" @if($ft_required) required @endif
            @isset($ft_onchange) onchange="{{ $ft_onchange }}" @endisset
            {{-- Numeric --}}
            @isset($ft_min) min="{{$ft_min}}" @endisset @isset($ft_max) max="{{$ft_max}}" @endisset @isset($ft_step) step="{{$ft_step}}" @endisset
            >
    @if(isset($ft_group_text)) <span class="input-group-text" >{{ $ft_group_text }}</span></div> @endif
    @error($ft_variable)
        <div class="invalid-feedback d-block">{{ $message }}</div>
    @enderror
</div>

