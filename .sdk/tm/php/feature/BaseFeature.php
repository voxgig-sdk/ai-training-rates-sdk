<?php
declare(strict_types=1);

// AiTrainingRates SDK base feature

class AiTrainingRatesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AiTrainingRatesContext $ctx, array $options): void {}
    public function PostConstruct(AiTrainingRatesContext $ctx): void {}
    public function PostConstructEntity(AiTrainingRatesContext $ctx): void {}
    public function SetData(AiTrainingRatesContext $ctx): void {}
    public function GetData(AiTrainingRatesContext $ctx): void {}
    public function GetMatch(AiTrainingRatesContext $ctx): void {}
    public function SetMatch(AiTrainingRatesContext $ctx): void {}
    public function PrePoint(AiTrainingRatesContext $ctx): void {}
    public function PreSpec(AiTrainingRatesContext $ctx): void {}
    public function PreRequest(AiTrainingRatesContext $ctx): void {}
    public function PreResponse(AiTrainingRatesContext $ctx): void {}
    public function PreResult(AiTrainingRatesContext $ctx): void {}
    public function PreDone(AiTrainingRatesContext $ctx): void {}
    public function PreUnexpected(AiTrainingRatesContext $ctx): void {}
}
