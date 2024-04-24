<div class="mb-3 {{ $ft_widthClass }}" @if(isset($ft_container_id)) id="{{$ft_container_id}}" @endif>
    <label for="{{ $ft_variable }}" class="form-label">{{ $ft_text }}</label>
    <select class="form-select" id="{{ $ft_variable }}" name="{{ $ft_variable }}" @if($ft_required) required @endif
    @if(isset($ft_onchange)) onchange={{$ft_onchange}} @endif>
        @foreach($ft_types ?? [] as $item)
                <option @if(old($ft_variable, $ft_current) == $item) selected='selected' @endif value="{{$item}}">{{$item}}</option>
        @endforeach
    </select>
</div>
